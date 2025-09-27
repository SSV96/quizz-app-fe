interface EditQuizProps {
  params:{id:string}
}
import React from 'react'

const Page = ({params}:EditQuizProps) => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Edit Quiz:{params.id}</h1>
      <p>Edit Quiz</p>
    </div>
  )
}

export default Page