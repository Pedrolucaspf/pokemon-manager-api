export interface CaptureProps {
  id?: string;
  trainerId: string;
  pokemonName: string;
  spriteUrl: string;
  base_experience: number;
  height: number;
  weight: number;
}

export class Capture {
  private props: CaptureProps;

  constructor(props: CaptureProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }
  get trainerId() {
    return this.props.trainerId;
  }
  get pokemonName() {
    return this.props.pokemonName;
  }
  get spriteUrl() {
    return this.props.spriteUrl;
  }
  get base_experience() {
    return this.props.base_experience;
  }
  get height() {
    return this.props.height;
  }
  get weight() {
    return this.props.weight;
  }
}
