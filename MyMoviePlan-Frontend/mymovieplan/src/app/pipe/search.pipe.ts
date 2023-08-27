import { Pipe, PipeTransform } from '@angular/core';
import { Movies } from '../Models/Movie.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: Movies[] | null, search?: string, language?:string): Movies[] {
    if(movies?.length! > 0){
      if(search){
        const s = search.toLowerCase()
        movies=movies?.filter(movie=>movie.movieName.toLowerCase().indexOf(s)>-1||movie.language?.toLowerCase().indexOf(s)!>-1)!;
      }
      if(language)
      movies=movies?.filter(movie=>movie.language?.toLowerCase()==language.toLowerCase())!;
    }
    return movies!;
  }

}
