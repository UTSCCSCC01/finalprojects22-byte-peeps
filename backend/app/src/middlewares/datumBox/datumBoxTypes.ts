export type DatumServices =
  | 'SentimentAnalysis'
  | 'TopicClassification'
  | 'SubjectivityAnalysis';

export type DatumCallResult = {
  result: string;
  service: DatumServices;
};

export type DatumAPICallResult = { [id in DatumServices]: string };
