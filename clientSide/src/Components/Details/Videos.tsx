import { useState } from 'react'

const YoutubeIcon = () => (
   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
   </svg>
)

const Videos = ({ data }: any) => {
   const videoType = ['Trailer', 'Teaser', 'Clip', 'Behind the Scenes', 'Bloopers', 'Featurette'];

   const initialType = videoType.find(type => data[type]) || null;
   const [selectedType, setSelectedType]: any = useState(initialType);
   const [selectedVideo, setSelectedVideo] : any = useState(null);

   const convertDuration = (duration: any) => {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseInt(match[3]) : 0;

      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${minutes}:${formattedSeconds}`;
   };

   const formatDate = (dateString: any) => {
      const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
   };

   const openFullscreen = (video: any) => {
      setSelectedVideo(video);
   };

   const closeFullscreen = () => {
      setSelectedVideo(null);
   };

   if (data) {
      return (
         <>
            <div className='w-[66.5rem] flex py-[3.3125rem] gap-[3.6875rem]'>
               <ul className='w-[15.9375rem] h-full flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
                  {videoType.map((type) => {
                     return (
                        <li
                           key={type}
                           className='w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer hover:text-gray-400 transition-colors'
                           onClick={() => setSelectedType(type)}
                        >
                           <span>{type}</span>
                           <span>{data[type] ? data[type].length : 0}</span>
                        </li>
                     )
                  })}
               </ul>
               <div className={`w-[46.875rem] h-full flex flex-col flex-grow-0 flex-wrap gap-[1.7rem]`}>
                  {data[selectedType] && data[selectedType].length > 0 ? (
                     data[selectedType].map((video: any, index: number) => (
                        <div className='flex gap-[1.5625rem]' key={index}>
                           <div
                              className='relative cursor-pointer group'
                              onClick={() => openFullscreen(video)}
                           >
                              <img
                                 src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                                 className={`w-[22.5625rem] h-[12.691375rem] object-cover transition-opacity group-hover:opacity-80`}
                                 alt={video.name}
                              />
                              <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                 <div className='w-16 h-16 bg-red-600 rounded-full flex items-center justify-center'>
                                    <svg className='w-8 h-8 text-white ml-1' fill="currentColor" viewBox="0 0 24 24">
                                       <path d="M8 5v14l11-7z" />
                                    </svg>
                                 </div>
                              </div>
                           </div>
                           <section className='flex flex-col justify-between'>
                              <div className='flex flex-col gap-[0.4375rem]'>
                                 <span className='font-bold text-[1.09375rem]'>{video.name}</span>
                                 <div className='flex gap-[0.375rem] font-light text-[0.9375rem]'>
                                    <span>{video.type}</span>
                                    <span>•</span>
                                    <span>{convertDuration(video.youtubeData.contentDetails.duration)}</span>
                                    <span>•</span>
                                    <span>{formatDate(video.youtubeData.snippet.publishedAt)}</span>
                                 </div>
                              </div>
                              <div className='flex items-center gap-[0.6875rem] pb-[1rem]'>
                                 <YoutubeIcon />
                                 <span className='font-light text-[0.9375rem]'>{video.youtubeData.snippet.channelTitle}</span>
                              </div>
                           </section>
                        </div>
                     ))
                  ) : (
                     <div>There are no English {selectedType?.toLocaleLowerCase()} added.</div>
                  )}
               </div>
            </div>

            {/* Fullscreen Modal */}
            {selectedVideo && (
               <div
                  className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4'
                  onClick={closeFullscreen}
               >
                  <div
                     className='relative w-full max-w-6xl aspect-video'
                     onClick={(e) => e.stopPropagation()}
                  >
                     <button
                        onClick={closeFullscreen}
                        className='absolute -top-12 right-0 text-white text-4xl font-light hover:text-gray-400 transition-colors z-10'
                        aria-label='Close fullscreen'
                     >
                        ×
                     </button>
                     <iframe
                        className='w-full h-full'
                        src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                        title={selectedVideo.name}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                     />
                     <div className='mt-4 text-white'>
                        <h3 className='text-xl font-bold mb-2'>{selectedVideo.name}</h3>
                        <div className='flex gap-2 text-sm text-gray-300'>
                           <span>{selectedVideo.type}</span>
                           <span>•</span>
                           <span>{convertDuration(selectedVideo.youtubeData.contentDetails.duration)}</span>
                           <span>•</span>
                           <span>{formatDate(selectedVideo.youtubeData.snippet.publishedAt)}</span>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </>
      );
   }
};

export default Videos;