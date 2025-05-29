import React from 'react'
import { services } from '../../assets/Constants/constant.js'
import "./service.css"

const Service = () => {

  return (
    <div className='serviceMain'>
      {
        services ? (
          services.map((service) => (
            <div className='services' key={services.id}>
              <service.icon size={40} style={{ color: "red" }} />
              <div className='servicedesc'>
                <h4 className='title'>{service.title}</h4>
                <p className='desc'>{service.desc}</p>
              </div>
            </div>
          ))
        ) : (<div>Services loading...</div>)
      }

    </div>
  )
}

export default Service
