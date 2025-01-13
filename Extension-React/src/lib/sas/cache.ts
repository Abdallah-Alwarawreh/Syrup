interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

export interface CacheOptions {
    cache?: number;        // Duration in milliseconds
    clear_cache?: boolean; // Force clear cache flag
}

export class CacheManager {
    private static instance: CacheManager;
    private cache: { [key: string]: CacheEntry<any> } = {};

    private constructor() {
        // Load cache from storage on initialization
        this.loadFromStorage();

        // Set up periodic cleanup of expired items
        setInterval(() => this.cleanup(), 5 * 60 * 1000); // Cleanup every 5 minutes
    }

    static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    async get<T>(key: string, options?: CacheOptions): Promise<T | null> {
        // Clear cache if requested
        if (options?.clear_cache) {
            this.remove(key);
            return null;
        }

        const entry = this.cache[key];

        // Check if cache exists and is still valid
        if (entry && entry.expiresAt > Date.now()) {
            return entry.data as T;
        }

        // Remove expired entry
        if (entry) {
            this.remove(key);
        }

        return null;
    }

    set<T>(key: string, data: T, duration: number): void {
        const expiresAt = Date.now() + duration;
        this.cache[key] = { data, expiresAt };
        this.saveToStorage();
    }

    remove(key: string): void {
        delete this.cache[key];
        this.saveToStorage();
    }

    private cleanup(): void {
        const now = Date.now();
        let hasChanges = false;

        Object.keys(this.cache).forEach(key => {
            if (this.cache[key].expiresAt <= now) {
                delete this.cache[key];
                hasChanges = true;
            }
        });

        if (hasChanges) {
            this.saveToStorage();
        }
    }

    private saveToStorage(): void {
        try {
            const serialized = JSON.stringify(this.cache);
            localStorage.setItem('syrup_api_cache', serialized);
        } catch (error) {
            // TODO: Use the logger instead of console
            console.warn('Failed to save cache to storage:', error);
        }
    }

    private loadFromStorage(): void {
        try {
            const serialized = localStorage.getItem('syrup_api_cache');
            if (serialized) {
                this.cache = JSON.parse(serialized);
                this.cleanup(); // Clean up any expired entries immediately
            }
        } catch (error) {
            // TODO: Use the logger instead of console
            console.warn('Failed to load cache from storage:', error);
        }
    }
}