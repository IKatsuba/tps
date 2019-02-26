import { Component, ReactNode } from 'react';
import { Observable, Subscription } from 'rxjs';

export interface StreamBuilderProps {
  stream: Observable<any>;
  children: (snapshot: any) => ReactNode;
}

export interface StreamBuilderState {
  snapshot: any;
}

export enum ConnectionState {
  Waiting, Connect, Error, Done
}

export class Snapshot<T = any, E = any> {
  constructor(public readonly state: ConnectionState,
              public readonly data: T,
              public error: E) {
  }

  public get hasData(): boolean {
    return !!this.data;
  }

  public get hasError(): boolean {
    return !!this.error;
  }
}

export class StreamBuilder extends Component<StreamBuilderProps, StreamBuilderState> {
  public state = {
    snapshot: new Snapshot<null>(ConnectionState.Waiting, null, null)
  };

  private readonly subscriptions: Subscription[] = [];

  constructor(props: StreamBuilderProps) {
    super(props);

    this.subscriptions.push(
      this.props.stream.subscribe(
        data => this.setState({ snapshot: new Snapshot(ConnectionState.Connect, data, null) }),
        error => this.setState({ snapshot: new Snapshot(ConnectionState.Error, null, error) }),
        () => this.setState({ snapshot: new Snapshot(ConnectionState.Done, null, null) })
      )
    );
  }

  public componentWillUnmount(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public render(): ReactNode {
    return this.props.children(this.state.snapshot);
  }
}
