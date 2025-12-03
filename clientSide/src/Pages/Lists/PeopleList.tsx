import { useEffect, useState } from 'react'
import Marquee from '../../components/ShowsList/Marquee'
import { peopleList } from '../../api/api';
import _ from 'lodash'
import GridView from '../../components/ShowsList/ListManager/ViewDisplay/GridView';

// Define the Person interface based on typical API response
interface Person {
   id: number;
   name: string;
   profile_path: string | null;
   known_for_department?: string;
   popularity?: number;
   // Add other fields as needed based on your API response
}

const PeopleList = () => {
   const [people, setPeople] = useState<Person[]>([]);
   const [currentPage, setCurrentPage] : any = useState(1)

   useEffect(() => {
      document.title = 'tskr! Movie Database Website';

      const fetchPeopleList = async () => {
         try {
            const data = await peopleList(currentPage);
            setPeople(prevPeople => {
               if (currentPage === 1) {
                  return data.results
               }
               else {
                  const existingPeopleIds = new Set(prevPeople.map(person => person.id));
                  const newPeople = data.results.filter((person: Person) => !existingPeopleIds.has(person.id));
                  return [...prevPeople, ...newPeople];
               }
            });
         }
         catch (error) {
            console.log('Encounted an error while fetching movie data', error)
         }
      }

      fetchPeopleList();

      const handleScroll = _.debounce(() => {
         const scrollPosition = window.innerHeight + window.scrollY;
         const documentHeight = document.body.offsetHeight;

         if (scrollPosition >= documentHeight) {
            setCurrentPage((prevPage : any) => prevPage + 1);  // Increase page number
         }
      }, 500);

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [currentPage]);

   console.log(people)

   return (
      <>
         <main className='text-white flex flex-col font-roboto'>
            <Marquee display={"people"} />
            <div className='w-[66.5625rem] flex justify-between'>
               <GridView people={people} />
            </div>
         </main>
      </>
   )
}

export default PeopleList