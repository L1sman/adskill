import {observer} from "mobx-react-lite";
import cls from './ClientDetails.module.scss'
import type {Client} from "../../../lib/types.ts";
import RowData from "./RowData/RowData.tsx";


const ClientDetails = observer(({client}: { client: Client }) => {

  return (
    <div className={cls.detailsContainer}>
      <p className={cls.clientName}>{client.name.toUpperCase()}</p>
      <span style={{width: '100%', height: "1px", borderTop: "1px solid #E7E7E7"}}></span>
      <div className={cls.detailsPart}>
        <RowData label={'Account manager'}>
          <div className={cls.imageWrapper}>
            <img src={client.account_manager_image} alt={client.account_manager}
                 style={{
                   width: '18px',
                   height: '18px',
                   borderRadius: '50%',
                   objectFit: 'cover',
                 }}></img>
            <div>{client.account_manager}</div>
          </div>
        </RowData>
        <RowData label={'Sales manager'}>
          <div className={cls.imageWrapper}>
            <img src={client.sales_manager_image} alt={client.sales_manager}
                 style={{
                   width: '18px',
                   height: '18px',
                   borderRadius: '50%',
                   objectFit: 'cover',
                 }}></img>
            <div>{client.sales_manager}</div>
          </div>
        </RowData>
        <RowData label={'Start date'}>{client.start_date}</RowData>
        <RowData label={'Status'}>
          <div style={{color: client.status === 'ACTIVE' ? '#68DB3B' : '#717378'}}>
            {client.status}
          </div>
        </RowData>
      </div>
      <span style={{width: '100%', height: "1px", borderTop: "1px solid #E7E7E7"}}></span>
      <div className={cls.detailsPart}>
        <RowData label={'Type of client'}>{client.type_of_client}</RowData>
        <RowData label={'Experience'}>{client.experience}</RowData>
        <RowData label={'Monthly budgets'}>{client.monthly_budgets}</RowData>
      </div>
      <span style={{width: '100%', height: "1px", borderTop: "1px solid #E7E7E7"}}></span>
      <div className={cls.clientBalance}>
        <p>BALANCE</p>
        <div className={cls.balance}>
          <div>{new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(client.balance_usd)} USD
          </div>
          <div>{new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(client.balance_rub)} RUB
          </div>
        </div>
        <p>LOANS</p>
        <div style={{color: "#ED2A2A", marginBottom: '8px'}}>{new Intl.NumberFormat('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(client.loans_rub)} RUB
        </div>
      </div>
      <span style={{width: '100%', height: "1px", borderTop: "1px solid #E7E7E7"}}></span>
      <div className={cls.detailsButtonWrapper}>
        <button type={"button"} className={cls.detailsArchiveBtn}>Archive</button>
        <button type={"button"} className={cls.detailsEditBtn}>Edit</button>
      </div>
    </div>
  )
})

export default ClientDetails
