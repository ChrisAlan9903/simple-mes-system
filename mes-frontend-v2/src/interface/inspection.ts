export interface InspectionResponse {
  id?: number;
  production_order_id?: number;
  inspection_status?: string;
  inspection_date?: string;
  inspector_name?: string;
  result?: string;
  quantity_inspected?: number;
  defects_count?: number;
  remarks?: string;
}

export interface Inspection {
  id: number;
  production_order_id: number;
  inspection_status: string;
  inspection_date: Date;
  inspector_name: string;
  result: string;
  quantity_inspected: number;
  defects_count: number;
  remarks: string;
}
