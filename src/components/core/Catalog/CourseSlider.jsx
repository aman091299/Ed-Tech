import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
        slidesPerView={4} 
          
          spaceBetween={24}
          loop={true}
        
          freemode={true}
          autoplay={true }
          modules={[FreeMode, Pagination,Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
          }}
          className="h-[300px] max-h-[40rem] mySwiper"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="h-[300px]">
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
