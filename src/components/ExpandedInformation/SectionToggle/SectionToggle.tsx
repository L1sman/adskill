import { observer } from 'mobx-react-lite';
import {clientStore} from "../../../store/сlientStore.ts";
import cls from './SectionToggle.module.scss';
import OffersIcon from '../../../assets/svg/offer.svg?react'
import TermsIcon from '../../../assets/svg/bank.svg?react'

const SectionToggle = observer(() => {

  return (
    <div className={cls.tabToggle}>
      <div className={cls.toggleWrapper} onClick={() => {clientStore.setActiveTab("offers")}}>
        <OffersIcon className={clientStore.activeTab === "offers" ? cls.activeIcon : cls.inactiveIcon}/>
      </div>
      <div className={cls.toggleWrapper} onClick={() => {clientStore.setActiveTab("terms")}}>
        <TermsIcon className={clientStore.activeTab === "terms" ? cls.activeIcon : cls.inactiveIcon} />
      </div>
    </div>
  );
});

export default SectionToggle;
