import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IQuiz, IQuizSummary } from '@/src/types';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export const createQuiz = async (newQuiz: Partial<IQuiz>) => {
  const { data } = await api.post('/quizzes', newQuiz);
  return data;
};

export const fetchQuizzes = async (): Promise<IQuizSummary[]> => {
  const { data } = await api.get('/quizzes');
  return data ?? [];
};

export const fetchQuizById = async (id: string): Promise<IQuiz> => {
  const { data } = await api.get(`/quizzes/${id}`);
  return data;
};

export const useQuizzes = () => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: fetchQuizzes,
    staleTime: 1000 * 60,
  });
};

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => fetchQuizById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useCreateQuiz = (successcb: (data: IQuiz) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      successcb(data);
      toast.success('Successfuly Created Quiz');
    },
    onError: () => {
      toast.error('Unable to Create Quiz');
    },
  });
};

const updateQuiz = async (quiz: Partial<IQuiz>) => {
  const { id, ...payload } = quiz;

  const { data } = await api.put(`/quizzes/${id}`, payload);

  return data;
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuiz,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['quiz', id] });
      toast.success('Successfuly Updated Quiz');
    },
    onError: () => {
      toast.error('Unable to Update Quiz');
    },
  });
};

const deleteQuiz = async (id: string) => {
  await api.delete(`/quizzes/${id}`);
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast.success('Successfuly Deleted Quiz');
    },
    onError: () => {
      toast.error('Unable to Delete Quiz');
    },
  });
};

const publishQuiz = async (id: string) => {
  await api.post(`/quizzes/${id}/publish`);
};

export const usePublishedQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast.success('Successfuly Published Quiz');
    },
    onError: () => {
      toast.error('Unable to Publish Quiz');
    },
  });
};
