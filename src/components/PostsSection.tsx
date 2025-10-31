// "use client";
// import React, { useEffect, useRef, useState } from "react";

// const posts = [
//   {
//     id: 1,
//     image: "/posts/BugLife Cycle.png",
//     title: "Bug Life Cycle",
//     link: "https://www.linkedin.com/feed/update/urn:li:activity:7354861305658245122/",
//     type: "image"
//   },
//   {
//     id: 2,
//     image: "/posts/Mind map.png",
//     title: "𝐈𝐧𝐭𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐭𝐨 𝐒𝐨𝐟𝐭𝐰𝐚𝐫𝐞 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐂𝐨𝐧𝐜𝐞𝐩𝐭𝐬 & 𝐓𝐞𝐜𝐡𝐧𝐢𝐪𝐮𝐞𝐬",
//     link: "https://www.linkedin.com/feed/update/urn:li:activity:7194678576120573955/",
//     type: "image"
//   },
//   {
//     id: 3,
//     image: "/posts/BugLife Cycle.png",
//     title: "UI/UX Testing Strategies",
//     link: "https://www.linkedin.com/posts/your-profile/uiux-testing-strategies-activity-789",
//     type: "image"
//   },
//   {
//     id: 4,
//     image: "/posts/BugLife Cycle.png",
//     title: "Performance Testing with JMeter",
//     link: "https://www.linkedin.com/posts/your-profile/performance-testing-jmeter-activity-101",
//     type: "image"
//   }
// ];

// // دالة لتحديد نوع الميديا
// const getMediaType = (mediaPath: string): 'image' | 'video' | 'gif' => {
//   if (!mediaPath) return 'image';
  
//   const extension = mediaPath.split('.').pop()?.toLowerCase();
  
//   if (extension === 'mp4' || extension === 'webm' || extension === 'mov') {
//     return 'video';
//   } else if (extension === 'gif') {
//     return 'gif';
//   } else {
//     return 'image';
//   }
// };

// const PostsSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredPost, setHoveredPost] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const postsRef = useRef<HTMLDivElement>(null);
//   const sectionRef = useRef<HTMLElement>(null);

//   // علشان نdetect الـ theme change بدون refresh
//   const [theme, setTheme] = useState<"light" | "dark">("dark");

//   useEffect(() => {
//     // دالة علشان تcheck الـ theme الحالي
//     const checkTheme = () => {
//       const isDark = document.documentElement.classList.contains('dark');
//       setTheme(isDark ? "dark" : "light");
//     };

//     // check الـ theme أول ما component يmount
//     checkTheme();

//     // MutationObserver علشان نسمع لـ theme changes
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.attributeName === 'class') {
//           checkTheme();
//         }
//       });
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['class']
//     });

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // Drag functions
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!postsRef.current) return;
    
//     setIsDragging(true);
//     setStartX(e.pageX - postsRef.current.offsetLeft);
//     setScrollLeft(postsRef.current.scrollLeft);
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//     setHoveredPost(null);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !postsRef.current) return;
    
//     e.preventDefault();
//     const x = e.pageX - postsRef.current.offsetLeft;
//     const walk = (x - startX) * 2; // scroll-fast
//     postsRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const buttonStyle = `
//     relative gap-2 text-white font-medium 
//     bg-gradient-to-r 
//     from-blue-600 via-blue-500 to-blue-400
//     overflow-hidden
//     shadow-[0_0_8px_rgba(59,130,246,0.4)] 
//     dark:shadow-[0_0_12px_rgba(59,130,246,0.3)] 
//     transition-all duration-500 
//     hover:scale-[1.02] hover:brightness-105
//     before:absolute before:top-0 before:left-[-75%] 
//     before:w-[50%] before:h-full 
//     before:bg-gradient-to-tr before:from-white/30 before:to-white/10
//     before:skew-x-[-20deg]
//     before:animate-none
//     hover:before:animate-[shine_1.5s_ease-in-out_forwards]
//     before:rounded-[inherit]
//   `;

//   // التنقل بين البوستات
//   const nextPost = () => {
//     setCurrentIndex((prev) => (prev + 1) % posts.length);
//   };

//   const prevPost = () => {
//     setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
//   };

//   const goToPost = (index: number) => {
//     setCurrentIndex(index);
//   };

//   // حساب البوستات المعروضة (بوستين في الشاشات الكبيرة، بوست واحد في الصغيرة)
//   const getVisiblePosts = () => {
//     if (typeof window !== 'undefined' && window.innerWidth < 1024) {
//       return [posts[currentIndex]];
//     } else {
//       const postsToShow = [];
//       for (let i = 0; i < 2; i++) {
//         const index = (currentIndex + i) % posts.length;
//         postsToShow.push(posts[index]);
//       }
//       return postsToShow;
//     }
//   };

//   const visiblePosts = getVisiblePosts();
//   const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

//   return (
//     <section ref={sectionRef} id="posts" className="py-24 px-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="container mx-auto mb-16">
//         <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             <span className="gradient-text">LinkedIn Posts</span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Latest insights and thoughts about software testing
//           </p>
//           <p className="text-sm text-muted-foreground mt-2">
//             Click and drag to scroll • Hover to zoom
//           </p>
//         </div>
//       </div>

//       <div className="relative">
//         {/* Main posts container مع drag support */}
//         <div 
//           ref={postsRef}
//           className={`flex overflow-x-auto scrollbar-hide py-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//           style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
//         >
//           {/* Auto-scrolling posts لما مش dragging */}
//           {!isDragging && (
//             <div className="flex animate-marquee-smooth gap-12 px-8 flex-none">
//               {[...visiblePosts, ...visiblePosts].map((post, index) => (
//                 <div
//                   key={`${post.id}-auto-${index}`}
//                   className="flex flex-col min-w-[400px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:z-10 hover:bg-white dark:hover:bg-gray-700 group overflow-hidden"
//                   style={{
//                     transform: hoveredPost === `${post.id}-auto-${index}` ? 'scale(1.25)' : 'scale(1)',
//                     zIndex: hoveredPost === `${post.id}-auto-${index}` ? 20 : 1,
//                   }}
//                   onMouseEnter={() => setHoveredPost(`${post.id}-auto-${index}`)}
//                   onMouseLeave={() => setHoveredPost(null)}
//                 >
//                   {/* صورة/فيديو البوست */}
//                   <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
//                     {getMediaType(post.image) === 'video' ? (
//                       <video 
//                         src={post.image} 
//                         className="w-full h-full object-contain"
//                         autoPlay
//                         muted
//                         loop
//                         playsInline
//                         title={post.title}
//                       />
//                     ) : (
//                       <img 
//                         src={post.image} 
//                         alt={post.title}
//                         className="w-full h-full object-contain"
//                         loading="lazy"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = 'none';
//                           const fallback = document.createElement('div');
//                           fallback.className = 'w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center';
//                           fallback.innerHTML = `<span class="text-white font-bold text-lg">${post.title.charAt(0)}</span>`;
//                           target.parentNode?.appendChild(fallback);
//                         }}
//                       />
//                     )}
//                   </div>

//                   {/* محتوى البوست */}
//                   <div className="p-6 flex-1 flex flex-col">
//                     <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 line-clamp-2 transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
//                       {post.title}
//                     </h4>
                    
//                     <button
//                       onClick={() => window.open(post.link, "_blank")}
//                       className={`${buttonStyle} w-full py-2.5 px-4 rounded-lg mt-auto`}
//                     >
//                       <span className="flex items-center justify-center gap-2">
//                         View on LinkedIn
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Static content for dragging */}
//           {isDragging && (
//             <div className="flex gap-12 px-8 flex-none">
//               {visiblePosts.map((post, index) => (
//                 <div
//                   key={`${post.id}-drag-${index}`}
//                   className="flex flex-col min-w-[400px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group overflow-hidden"
//                   onMouseEnter={() => setHoveredPost(`${post.id}-drag-${index}`)}
//                   onMouseLeave={() => setHoveredPost(null)}
//                 >
//                   {/* صورة/فيديو البوست */}
//                   <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
//                     {getMediaType(post.image) === 'video' ? (
//                       <video 
//                         src={post.image} 
//                         className="w-full h-full object-contain"
//                         autoPlay
//                         muted
//                         loop
//                         playsInline
//                         title={post.title}
//                       />
//                     ) : (
//                       <img 
//                         src={post.image} 
//                         alt={post.title}
//                         className="w-full h-full object-contain"
//                         loading="lazy"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = 'none';
//                           const fallback = document.createElement('div');
//                           fallback.className = 'w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center';
//                           fallback.innerHTML = `<span class="text-white font-bold text-lg">${post.title.charAt(0)}</span>`;
//                           target.parentNode?.appendChild(fallback);
//                         }}
//                       />
//                     )}
//                   </div>

//                   {/* محتوى البوست */}
//                   <div className="p-6 flex-1 flex flex-col">
//                     <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 line-clamp-2">
//                       {post.title}
//                     </h4>
                    
//                     <button
//                       onClick={() => window.open(post.link, "_blank")}
//                       className={`${buttonStyle} w-full py-2.5 px-4 rounded-lg mt-auto`}
//                     >
//                       <span className="flex items-center justify-center gap-2">
//                         View on LinkedIn
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Gradient overlays */}
//         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
//         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
//       </div>

//       {/* التحكم في التنقل - تحت النقاط */}
//       {posts.length > (isMobile ? 1 : 2) && (
//         <div className="flex items-center justify-center gap-4 mt-8">
//           {/* زر السابق */}
//           <button
//             onClick={prevPost}
//             className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all duration-300 hover:scale-110 w-10 h-10 rounded-full flex items-center justify-center"
//           >
//             <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           {/* مؤشرات البوستات */}
//           <div className="flex justify-center space-x-2">
//             {Array.from({ length: isMobile ? posts.length : Math.ceil(posts.length / 2) }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(isMobile ? index : index * 2)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   (isMobile ? currentIndex === index : Math.floor(currentIndex / 2) === index)
//                     ? "bg-blue-500 scale-125"
//                     : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
//                 }`}
//                 aria-label={`Go to post ${isMobile ? index + 1 : index * 2 + 1}`}
//               />
//             ))}
//           </div>

//           {/* زر التالي */}
//           <button
//             onClick={nextPost}
//             className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all duration-300 hover:scale-110 w-10 h-10 rounded-full flex items-center justify-center"
//           >
//             <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       )}

//       {/* إضافة الـ CSS */}
//       <style jsx>{`
//         @keyframes marquee-smooth {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(calc(-100% / 2));
//           }
//         }
//         .animate-marquee-smooth {
//           animation: marquee-smooth 40s linear infinite;
//         }
        
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
        
//         @keyframes shine {
//           to {
//             left: 125%;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PostsSection;