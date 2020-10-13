export interface RateXml {
  NumCode: number;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: string;
}

export interface RateJson {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: string;
  Previous: number;
}
