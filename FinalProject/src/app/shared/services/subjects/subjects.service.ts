import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedPostResponse } from '../../Interfaces/Post/feedPostResponse';
import { FriendRequestWithreciverAndCreators } from '../../Interfaces/FriendRequestedStatus/status.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() { }


newpath$ = new BehaviorSubject<string>('');

//ესენი პოსტებისთვის
arraySubject = new BehaviorSubject<FeedPostResponse[]>([]); 
LocalArray: FeedPostResponse[] = [];  //ეს უნდა ჩავტენოთ
localPostIdarray:number[]=[]

public localRequestArray$ = new BehaviorSubject<FriendRequestWithreciverAndCreators[]>([]);


//ფოლოვერების მასივი
FollowersArray$ = new BehaviorSubject<FriendRequestWithreciverAndCreators[]>([])
followersArray:FriendRequestWithreciverAndCreators[]=[]

//requests
public RequestarrayLenght$ =new BehaviorSubject<number>(0)

}
