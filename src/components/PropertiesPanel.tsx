'use client';
import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../store/useCanvasStore';
import { Delete } from '@mui/icons-material';
import { Button, Zoom, FormControlLabel, Switch } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { BlockEnum, QuestionKindEnum } from '../types/block';

export default function PropertiesPanel() {
  const quizzes = useQuizStore((s) => s.quizzes);

  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);

  const updateBlock = useQuizStore((s) => s.updateBlock);
  const togglePublishQuiz = useQuizStore((s) => s.togglePublishQuiz);

  const quiz = quizzes.find((q) => q.id === selectedQuizId);
  const block = quiz?.blocks.find((b) => b.id === selectedBlockId);

  const [localQuestion, setLocalQuestion] = useState(block?.properties.question);

  useEffect(() => {
    if (block?.type === BlockEnum.QUESTION) {
      setLocalQuestion(block.properties.question);
    }
  }, [block]);

  useEffect(() => {
    if (block?.type === BlockEnum.QUESTION && localQuestion) {
      const timeout = setTimeout(() => {
        updateBlock(block.id, { question: localQuestion });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [localQuestion, block?.id, block?.type, updateBlock]);

  if (!block) {
    return (
      <div style={{ width: 320 }} className="p-4 border-l bg-white flex flex-col h-full">
        <p className="text-gray-400">Select a block to edit</p>
      </div>
    );
  }

  const handleDeleteOption = (optionId: string) => {
    setLocalQuestion((prev) => ({
      ...prev!,
      options: prev?.options?.filter((o) => o.id !== optionId),
      correctOptionIds: prev?.correctOptionIds?.filter((id) => id !== optionId),
    }));
  };

  return (
    <div style={{ width: 320 }} className="p-4 border-l flex flex-col justify-between h-full">
      <div className="flex-1">
        {block.type !== BlockEnum.QUESTION ? (
          <>
            <h3 className="font-bold mb-3">Edit {block.type}</h3>
            <p className="w-full px-3 py-2">{block.properties.text || ''}</p>
          </>
        ) : (
          <>
            <h3 className="font-bold mb-3">Edit Question</h3>
            <p className="font-semibold text-gray-700 mb-3">
              {localQuestion?.text || 'Untitled Question'}
            </p>
            <label className="block mb-1 font-medium">Question Type</label>
            <select
              value={localQuestion?.kind || QuestionKindEnum.SINGLE}
              onChange={(e) =>
                setLocalQuestion({
                  ...localQuestion!,
                  kind: e.target.value as QuestionKindEnum,
                  correctOptionIds: [],
                })
              }
              className="w-full border px-3 py-2 rounded mb-3"
            >
              <option value="single">Single Choice</option>
              <option value="multi">Multiple Choice</option>
              <option value="text">Text Answer</option>
            </select>
            {localQuestion?.kind !== QuestionKindEnum.TEXT && (
              <>
                <h4 className="font-semibold mb-2">Options</h4>
                {localQuestion?.options?.map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) =>
                        setLocalQuestion({
                          ...localQuestion!,
                          options: localQuestion.options?.map((o) =>
                            o.id === opt.id ? { ...o, text: e.target.value } : o,
                          ),
                        })
                      }
                      className="flex-1 border px-3 py-1 rounded"
                    />
                    {localQuestion.kind === QuestionKindEnum.SINGLE ? (
                      <input
                        type="radio"
                        name="correct"
                        checked={localQuestion.correctOptionIds?.[0] === opt.id}
                        onChange={() =>
                          setLocalQuestion({
                            ...localQuestion!,
                            correctOptionIds: [opt.id],
                          })
                        }
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={localQuestion.correctOptionIds?.includes(opt.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setLocalQuestion({
                            ...localQuestion!,
                            correctOptionIds: checked
                              ? [...(localQuestion.correctOptionIds || []), opt.id]
                              : localQuestion.correctOptionIds?.filter((id) => id !== opt.id),
                          });
                        }}
                      />
                    )}

                    <button
                      onClick={() => handleDeleteOption(opt.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Delete />
                    </button>
                  </div>
                ))}

                <button
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() => {
                    const optionCount = localQuestion?.options?.length ?? 0;
                    setLocalQuestion({
                      ...localQuestion!,
                      options: [
                        ...(localQuestion?.options || []),
                        {
                          id: crypto.randomUUID(),
                          text: `Option ${optionCount + 1}`,
                        },
                      ],
                    });
                  }}
                >
                  + Add Option
                </button>
              </>
            )}

            {localQuestion?.kind == QuestionKindEnum.TEXT && (
              <input
                type="text"
                value={localQuestion.textAnswer ?? ''}
                onChange={(e) =>
                  setLocalQuestion({
                    ...localQuestion!,
                    textAnswer: e.target.value,
                  })
                }
                className="flex-1 border px-3 py-1 rounded"
              />
            )}
          </>
        )}
      </div>

      <div className="mt-auto pt-4 border-t flex flex-col gap-3 ">
        <Zoom in>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={() => useQuizStore.getState().saveQuiz()}
            className="!rounded-xl !px-6 !py-3 shadow-lg"
          >
            Save Quiz
          </Button>
        </Zoom>

        {quiz && (
          <Zoom in>
            <FormControlLabel
              control={
                <Switch
                  checked={quiz.published}
                  onChange={() => togglePublishQuiz(quiz.id)}
                  color="primary"
                />
              }
              label={quiz.published ? 'Published' : 'Draft'}
            />
          </Zoom>
        )}
      </div>
    </div>
  );
}
