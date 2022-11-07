export default interface OptionModel {
  value: string | number;
  label: string;
  children?: OptionModel[];
}
