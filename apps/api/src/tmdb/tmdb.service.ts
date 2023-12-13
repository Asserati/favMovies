import { Injectable } from '@nestjs/common';
import { TmdbEndpoints } from './tmdbendpoints.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class TmdbService {
  constructor(
    private tmdbEndpoints: TmdbEndpoints,
    private httpService: HttpService,
  ) {}
  private fetchData(url: string): Observable<AxiosResponse> {
    return this.httpService.get(url);
  }
  getMediaList({ mediaType, mediaCategory, page }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    return this.fetchData(url);
  }

  getMediaDetail({ mediaType, mediaId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaDetail({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaGenres({ mediaType }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaGenres({ mediaType });
    return this.fetchData(url);
  }

  getMediaCredits({ mediaType, mediaId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaCredits({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaVideos({ mediaType, mediaId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaVideos({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaImages({ mediaType, mediaId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaImages({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaRecommend({ mediaType, mediaId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaRecommend({ mediaType, mediaId });
    return this.fetchData(url);
  }

  getMediaSearch({ mediaType, query, page }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.mediaSearch({ mediaType, query, page });
    return this.fetchData(url);
  }

  getPersonDetail({ personId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.personDetail({ personId });
    return this.fetchData(url);
  }

  getPersonMedias({ personId }): Observable<AxiosResponse> {
    const url = this.tmdbEndpoints.personMedias({ personId });
    return this.fetchData(url);
  }
}
