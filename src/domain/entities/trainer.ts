export interface TrainerProps {
  id?: string;
  name: string;
  email: string;
  city: string;
}

export class Trainer {
  private props: TrainerProps;

  constructor(props: TrainerProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get city() {
    return this.props.city;
  }
}
