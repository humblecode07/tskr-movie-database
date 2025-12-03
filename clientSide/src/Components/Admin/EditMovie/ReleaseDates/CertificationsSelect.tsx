import { useEffect, useState } from 'react'
import { certificationList } from '../../../../api/api';

const CertificationsSelect = ({ releaseDate, setReleaseDate } : any) => {
   const [selectedCertifications, setSelectedCertifications] = useState([])

   useEffect(() => {
      const fetchCertification = async () => {
         try {
            const response = await certificationList('movie');

            console.log(response);

            if (releaseDate.country) {
               // Assuming the country code is in uppercase
               const countryCode = releaseDate.country.iso_3166_1.toUpperCase();

               // Filter certifications for the specific country
               const countryCertifications = response[countryCode] || [];

               setSelectedCertifications(countryCertifications);
            }

         }
         catch (error) {
            console.log("An error occured during the process", error)
         }
      }

      fetchCertification();
   }, [releaseDate.country])

   const handleChange = (e : any) => {
      setReleaseDate({ ...releaseDate, certification: e.target.value });
   }

   return (
      <div>
         <label htmlFor="type" className="block text-sm font-medium mb-2">Type</label>
         <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
            <div className='w-[39.625rem]'>
               <select
                  name='type'
                  className='w-full h-full bg-transparent text-white border-none outline-none text-[0.875rem] cursor-pointer'
                  onChange={handleChange}
               >
                  <option value="">Select Certification</option>
                  {selectedCertifications.map((cert : any, index) => (
                     <option
                        className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
                        key={index}
                        value={cert.certification}
                     >
                        {cert.certification} - {cert.meaning}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   )
}

export default CertificationsSelect
