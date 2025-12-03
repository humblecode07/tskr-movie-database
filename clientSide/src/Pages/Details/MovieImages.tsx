import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  appendImagesApi,
  getMyMovieDataApi,
  imagesApi,
  languages,
} from "../../api/api";
import Section from "../../Components/Details/Section";
import Medias from "../../Components/Details/Medias";

interface ImageItem {
  file_path: string;
  iso_639_1: string | null;
  width?: number;
  height?: number;
  vote_average?: number;
  [key: string]: any;
}

interface GroupedImages {
  [language: string]: ImageItem[];
}

interface SectionData {
  section_title: string;
  backdrop_path: string | null;
  title: string | null;
  release_date: string;
}

interface MediaData {
  id: string;
  section: SectionData;
  media: GroupedImages;
}

const isMongoDBId = (id: unknown): id is string =>
  typeof id === "string" && id.length === 24;


const MovieImages = () => {
  const params = useParams();
  const [medias, setMedias] = useState<MediaData | null>(null);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        if (!params.movieId || !params.mediaType) return;

        const movieId = params.movieId.split("-")[0];

        let response: any;
        let responseTwo: any;
        let responseThree: any;

        if (["backdrops", "posters", "logos"].includes(params.mediaType)) {
          if (isMongoDBId(movieId)) {
            [response, responseTwo] = await Promise.all([
              getMyMovieDataApi("movie", movieId),
              languages(),
            ]);

            const languageMap = responseTwo.reduce(
              (acc: Record<string, string>, lang: any) => {
                acc[lang.iso_639_1] = lang.english_name || lang.name;
                return acc;
              },
              {}
            );

            const groupedImagesByLang = response.movie.images[
              params.mediaType
            ].reduce((acc: GroupedImages, img: ImageItem) => {
              const langKey =
                languageMap[img.iso_639_1 || ""] ||
                img.iso_639_1 ||
                "No Language";

              if (!acc[langKey]) acc[langKey] = [];
              acc[langKey].push(img);

              return acc;
            }, {});

            setMedias({
              id: response.movie._id,
              section: {
                section_title:
                  params.mediaType.charAt(0).toUpperCase() +
                  params.mediaType.slice(1),
                backdrop_path: response.movie.backdrop_path,
                title: response.movie.title || null,
                release_date: response.movie.release_date.split("-")[0],
              },
              media: groupedImagesByLang,
            });

            return;
          }

          [response, responseTwo, responseThree] = await Promise.all([
            appendImagesApi("movie", movieId),
            imagesApi("movie", movieId),
            languages(),
          ]);

          const languageMap = responseThree.reduce(
            (acc: Record<string, string>, lang: any) => {
              acc[lang.iso_639_1] = lang.english_name || lang.name;
              return acc;
            },
            {}
          );

          const groupedImagesByLang = responseTwo[params.mediaType].reduce(
            (acc: GroupedImages, img: ImageItem) => {
              const langKey =
                languageMap[img.iso_639_1 || ""] ||
                img.iso_639_1 ||
                "No Language";

              if (!acc[langKey]) acc[langKey] = [];
              acc[langKey].push(img);

              return acc;
            },
            {}
          );

          setMedias({
            id: response.id,
            section: {
              section_title:
                params.mediaType.charAt(0).toUpperCase() +
                params.mediaType.slice(1),
              backdrop_path: response.backdrop_path,
              title: response.title || null,
              release_date: response.release_date.split("-")[0],
            },
            media: groupedImagesByLang,
          });
        }
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchMediaData();
  }, [params]);

  if (!medias) return null;

  return (
    <main className="text-white flex flex-col gap-0 font-roboto p-0">
      <Section data={medias.section} />
      <Medias data={medias.media} />
    </main>
  );
};

export default MovieImages;
