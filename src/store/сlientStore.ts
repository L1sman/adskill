import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import type {Client} from '../lib/types.ts';

class ClientStore {
  clients: Client[] = [];
  expandedClientIds: Set<number> = new Set();
  activeTab: string = "offers";

  constructor() {
    makeAutoObservable(this);
  }

  async loadClients() {
    try {
      const response = await axios.get("http://localhost:3001/clients");
      this.clients = response.data;
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  }

  async archiveClient(clientId: number) {
    try {
      await axios.delete(`http://localhost:3001/clients/${clientId}`);
      await this.loadClients();
    } catch (error) {
      console.error('Error archiving client:', error);
    }
  }

  toggleExpanded(id: number) {
    if (this.expandedClientIds.has(id)) {
      this.expandedClientIds.delete(id);
    } else {
      this.expandedClientIds.add(id);
    }
  }

  isExpanded(id: number) {
    return this.expandedClientIds.has(id);
  }

  setActiveTab(activeTab: string) {
    this.activeTab = activeTab
  }
}

export const clientStore = new ClientStore();
