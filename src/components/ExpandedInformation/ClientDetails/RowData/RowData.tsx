import React from "react";
import cls from '../ClientDetails.module.scss'

const RowData = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className={cls.managerRowData}>
    <div className={cls.rowLabel}>{label}</div>
    <div className={cls.rowDataChildren}>{children}</div>
  </div>
);

export default RowData
