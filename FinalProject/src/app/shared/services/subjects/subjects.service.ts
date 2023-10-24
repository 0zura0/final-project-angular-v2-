import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedPostResponse } from '../../Interfaces/Post/feedPostResponse';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() { }
newpath$ = new BehaviorSubject<string>('');


//ესენი პოსტებისთვის
arraySubject = new BehaviorSubject<FeedPostResponse[]>([]);
LocalArray: FeedPostResponse[] = [];
localPostIdarray:number[]=[]

}
