import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { rightImg, watchImg } from '../utils'
import ScrollTrigger from 'gsap/ScrollTrigger'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {
  gsap.registerPlugin(ScrollTrigger)

  // GSAP animations for title and links
  useGSAP(() => {
    gsap.fromTo(
      '#title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '#title',
          start: 'top 80%', 
          toggleActions: 'play none none reverse' 
        }
      }
    )

    gsap.fromTo(
      '.link',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        scrollTrigger: {
          trigger: '.link',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <section
      id='highlights'
      className='w-screen overflow-hidden h-full common-padding bg-zinc'
    >
      <div className='screen-max-width'>
        <div className='mb-12 w-full md:flex items-end justify-between'>
          <h1 id='title' className='section-heading'>
            Get the highlights.
          </h1>

          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film
              <img src={watchImg} alt='watch' className='ml-2' />
            </p>
            <p className='link'>
              Watch the event
              <img src={rightImg} alt='right' className='ml-2' />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights
