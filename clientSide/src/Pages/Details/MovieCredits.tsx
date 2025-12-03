import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { topLevelDataAppendCreditsApi } from '../../api/api';
import Section from '../../components/Details/Section';
import Credits from '../../components/Details/Credits';

// Type definitions
interface CastMember {
   id: number;
   name: string;
   character: string;
   profile_path: string | null;
   order: number;
   [key: string]: any;
}

interface CrewMember {
   id: number;
   name: string;
   job: string;
   department: string;
   profile_path: string | null;
   [key: string]: any;
}

interface GroupedCrew {
   [department: string]: CrewMember[];
}

interface SectionData {
   section_title: string;
   backdrop_path: string | null;
   title: string | null;
   release_date: string;
}

interface CreditsData {
   casts: CastMember[];
   crews: GroupedCrew;
}

interface MovieCreditsState {
   id: number;
   section: SectionData;
   credits: CreditsData;
}

interface ApiResponse {
   id: number;
   backdrop_path?: string;
   title?: string;
   release_date: string;
   credits: {
      cast: CastMember[];
      crew: CrewMember[];
   };
}

const MovieCredits = () => {
   const params = useParams<{ movieId: string }>();
   const [credits, setCredits] = useState<MovieCreditsState | undefined>(undefined);

   useEffect(() => {
      const fetchCreditsData = async () => {
         try {
            const response: ApiResponse = await topLevelDataAppendCreditsApi('movie', params.movieId!.split('-')[0]);

            console.log(response)

            const groupedCrew = response.credits.crew.reduce<GroupedCrew>((acc, member) => {
               if (!acc[member.department]) acc[member.department] = [];

               acc[member.department].push(member);

               return acc;
            }, {})

            setCredits({
               id: response.id,
               section: {
                  section_title: "Full Cast & Crew",
                  backdrop_path: response.backdrop_path || null,
                  title: response.title || null,
                  release_date: response.release_date.split('-')[0]
               },
               credits: {
                  casts: response.credits.cast || [],
                  crews: groupedCrew || {},
               }
            });
         }
         catch (error) {
            console.error('Error fetching data:', error);
         }
      }

      fetchCreditsData();
   }, [params.movieId])

   console.log(credits)

   if (credits) {
      return (
         <>
            <main className='text-white flex flex-col gap-[2.75rem] font-roboto p-0'>
               <Section data={credits.section} />
               <Credits data={credits.credits} />
            </main>
         </>
      )
   }
}

export default MovieCredits