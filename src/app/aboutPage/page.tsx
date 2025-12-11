import React from 'react'

const page = () => {
       return (
              <main className='min-[300px]:bg-green-500 sm:bg-red-500 md:bg-pink-500 lg:bg-yellow-500 xl:bg-orange-500'>
                     thsi is about page
                     <div className='min-[300px]:block sm:hidden'>min-[300px] to 640px:</div>
                     <div className='md:hidden'>md</div>
              </main>
       )
}

export default page
