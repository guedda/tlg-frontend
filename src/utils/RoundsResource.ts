import { roundsApi } from '../api/rounds';
import type { Round } from '../types';

export class RoundsResource {
  private promise: Promise<Round[]> | null = null;
  private data: Round[] | null = null;
  private error: Error | null = null;
  private listeners: Set<() => void> = new Set();

  read(): Round[] {
    if (this.error) {
      throw this.error;
    }
    if (this.data) {
      return this.data;
    }
    if (!this.promise) {
      this.promise = roundsApi.getAll()
        .then((data) => {
          this.data = data;
          this.promise = null;
          this.notifyListeners();
          return data;
        })
        .catch((err) => {
          this.error = err;
          this.promise = null;
          throw err;
        });
    }
    throw this.promise;
  }

  async refresh(): Promise<Round[]> {
    this.promise = null;
    this.data = null;
    this.error = null;
    this.promise = roundsApi.getAll()
      .then((data) => {
        this.data = data;
        this.promise = null;
        this.notifyListeners();
        return data;
      })
      .catch((err) => {
        this.error = err;
        this.promise = null;
        throw err;
      });
    return this.promise;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  getData(): Round[] | null {
    return this.data;
  }
}

export const roundsResource = new RoundsResource();
