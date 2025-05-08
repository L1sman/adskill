import {observer} from "mobx-react";
import cls from './ExpandedInformation.module.scss'
import type {Client} from "../../lib/types.ts";
import ClientDetails from "./ClientDetails/ClientDetails.tsx";
import SectionToggle from "./SectionToggle/SectionToggle.tsx";
import OffersTable from "./OffersTable/OffersTable.tsx";
import TermsTable from "./TermsTable/TermsTable.tsx";
import {clientStore} from "../../store/сlientStore.ts";

const ExpandedInformation = observer(({client}: { client: Client }) => {
  return (
    <div className={cls.expandWrapper}>
      <ClientDetails client={client}/>
      <SectionToggle/>
      {clientStore.activeTab === "offers" ? <OffersTable client={client}/> :  <TermsTable client={client}/>}


    </div>
  )
})

export default ExpandedInformation
