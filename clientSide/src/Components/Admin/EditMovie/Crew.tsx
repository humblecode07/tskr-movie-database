import { useState } from 'react'
import { useParams } from 'react-router-dom';
import AddIcon from '../../../assets/Icons/Admin/AddIcon';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';
import SearchBar from '../Credits/SearchBar';
import JobSearchBar from '../Credits/Jobs/JobSearchBar';
import { addCrewMember, deleteCrewMemeber } from '../../../api/api';
import EditIcon from '../../../assets/Icons/Admin/EditIcon';

interface CrewMember {
  id: number;
  name: string;
  original_name: string;
  department: string;
  job: string;
  profile_path?: string;
}

interface JobOccupation {
  job: string;
  department: string;
}

interface Credits {
  cast?: any[];
  crew: CrewMember[];
}

interface MovieData {
  credits?: Credits;
}

const Crew = ({ movieData, setMovieData }: any) => {
  const crewData: CrewMember[] = movieData.credits?.crew || [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleAddCastMemberModal = (): void => {
    console.log(isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  const [selectedPerson, setSelectedPerson] = useState<CrewMember | null>(null);
  const [jobOccupation, setJobOccupation] = useState<JobOccupation>({
    job: '',
    department: ''
  });

  const { movieId } = useParams<{ movieId: string }>();

  const handleAddCrew = async (): Promise<void> => {
    try {
      const crewMemberData: CrewMember = {
        id: selectedPerson!.id,
        name: selectedPerson!.name,
        original_name: selectedPerson!.original_name,
        department: jobOccupation.department,
        job: jobOccupation.job
      };

      // Convert to FormData
      const formData = new FormData();
      formData.append('id', crewMemberData.id.toString());
      formData.append('name', crewMemberData.name);
      formData.append('original_name', crewMemberData.original_name);
      formData.append('department', crewMemberData.department);
      formData.append('job', crewMemberData.job);

      // Add optional fields if they exist
      if (selectedPerson!.profile_path) {
        formData.append('profile_path', selectedPerson!.profile_path);
      }

      await addCrewMember(movieId!, formData);

      setMovieData((prevData: MovieData) => ({
        ...prevData,
        credits: {
          ...prevData.credits!,
          crew: [...(prevData.credits?.crew || []), crewMemberData],
        },
      }));

      alert('Crew have been added successfully!');
    }
    catch (error) {
      alert('Failed to add the crew member. This member might already be on the list.');
      console.error('Failed to add crew member:', error);
    }
  };

  const handleDeleteCrew = async (id: string): Promise<void> => {
    const confirmation = window.confirm("Are you sure you want to delete this crew member?");

    if (!confirmation) return;

    try {
      await deleteCrewMemeber(movieId!, id);
      alert('Crew member has been deleted successfully!');

      setMovieData((prevData: MovieData) => ({
        ...prevData,
        credits: {
          ...prevData.credits!,
          crew: prevData.credits?.crew.filter((crewMember : any) => crewMember.id !== id) || [],
        },
      }));
    }
    catch (error) {
      console.error('Failed to delete crew member:', error);
      alert('Failed to delete the crew member. Please try again.');
    }
  };

  if (crewData) {
    return (
      <div className="relative">
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={toggleAddCastMemberModal}
            className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
          >
            <AddIcon />
            <span className='text-[.75rem] font-semibold'>Add New Cast Member</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
            <thead>
              <tr className="border-b border-[#444444]">
                <th className="px-4 py-2 text-left">Person</th>
                <th className="px-4 py-2 text-left">Job</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {crewData.map((crewMember: any, index: number) => (
                <tr key={index} className="border-b border-[#444444] hover:bg-[#222222]">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span>{crewMember.name || crewMember.original_name}</span>
                  </td>
                  <td className="px-4 py-3">{crewMember.job}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#CC511D] flex items-center justify-center rounded-full hover:bg-[#FF7031] transition duration-200"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="w-[1.5625rem] h-[1.5625rem] bg-[#FF3333] flex items-center justify-center rounded-full hover:bg-[#e50000] transition duration-200"
                      onClick={() => handleDeleteCrew(crewMember.id)}
                    >
                      <DeleteIconWhite />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#CC511D]">Add Crew Member</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPerson(null);
                    setJobOccupation({
                      job: '',
                      department: ''
                    });
                  }}
                  className="text-white hover:text-[#CC511D] transition duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <SearchBar selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} type={'crew'} />
                <JobSearchBar jobOccupation={jobOccupation} setJobOccupation={setJobOccupation} />
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedPerson(null);
                      setJobOccupation({
                        job: '',
                        department: ''
                      })
                    }}
                    className="px-4 py-2 bg-[#444444] text-white rounded-md hover:bg-[#555555] transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
                    onClick={() => handleAddCrew()}
                  >
                    Add Crew Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Crew
