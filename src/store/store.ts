import { createContext } from 'react';
import { BehaviorSubject, combineLatest, defer, Observable, Subject } from 'rxjs';
import { debounceTime, map, pluck } from 'rxjs/operators';
import { Currencies } from '../utils';

export interface Bonus {
  title: string;
  description: string;
  link: string;
  promocode: string;
}

export interface HeaderData {
  balance: number;
  next_payout: number;
  currency: Currencies;
}

export interface State {
  bonuses: Bonus[];
  header: HeaderData;
}

export class StoreRepository {
  public fetch(): Observable<State> {
    return defer<Promise<State>>(() =>
      fetch('data.json')
        .then(res => res.json()));
  }
}

export class Store {
  private readonly state = new Subject<State>();
  private readonly filter = new BehaviorSubject<string>('');

  constructor(private readonly repository: StoreRepository) {
    this.repository.fetch().subscribe(
      (data) => this.state.next(data),
      error => this.state.error(error)
    );
  }

  public get bonuses(): Observable<Bonus[]> {
    return combineLatest<Observable<string>, Observable<Bonus[]>>([
      this.filter,
      this.state.pipe(
        pluck<State, Bonus[]>('bonuses')
      )
    ]).pipe(
      debounceTime(800),
      map(
        ([filter, bonuses]: [string, Bonus[]]) =>
          bonuses.filter(bonus => bonus.title.toLowerCase().includes(filter.toLowerCase()))
      )
    );
  }

  public get header(): Observable<HeaderData> {
    return this.state.pipe(pluck<State, HeaderData>('header'));
  }

  public applyFilter(filter: string) {
    this.filter.next(filter);
  }
}

export const store = new Store(new StoreRepository());

export const StoreContext = createContext<Store>(store);
