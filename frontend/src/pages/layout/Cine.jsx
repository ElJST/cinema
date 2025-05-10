import React from 'react'
import { Maps } from '../../components/Maps'
import { motion } from 'framer-motion'

export const Cine = () => {
  return (
    <motion.div
      className="w-full pt-6 lg:pb-40"
      initial={{ opacity: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col gap-6">
        <h4 className="text-xl md:text-5xl  max-w-xl px-6 md:px-0">
          Donde estamos
        </h4>
        <motion.div
          className="h-auto w-full shadow-xl shadow-white/15 md:shadow-none"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Maps />
        </motion.div>
        <h4 className="text-xl md:text-5xl px-6 md:px-0 w-full">
          Quienes somos
        </h4>
        <div className="h-auto w-full">
          <p className='max-w-3xl px-6 md:px-0 mb-8'>En <strong>Cinema</strong>, creemos que el cine es más que entretenimiento: es una experiencia que une emociones, historias y personas. Desde nuestra apertura, nos hemos comprometido a ofrecer lo mejor del séptimo arte con una atención cercana, salas cómodas y tecnología de última generación.

            Ofrecemos una cartelera variada que abarca desde los estrenos más esperados hasta cine independiente y local. Nuestro equipo está formado por amantes del cine que trabajan para que cada visita sea única.

            Ven a Cinema y vive el cine como debe ser: en pantalla grande, con sonido envolvente y la mejor compañía.</p>
        </div>
      </div>
    </motion.div>
  )
}
