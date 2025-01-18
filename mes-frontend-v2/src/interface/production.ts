import moment from "moment";

export interface ProductionResponse {
  id?: number;
  product_name?: string;
  quantity?: number;
  start_date?: string | null;
  expected_end_date?: string | null;
  actual_end_date?: string | null;
  status?: string;
  remarks?: string;
}

export interface Production {
  id?: number;
  product_name?: string;
  quantity?: number;
  start_date?: Date;
  expected_end_date?: Date;
  actual_end_date?: Date;
  status?: string;
  remarks?: string;
}
