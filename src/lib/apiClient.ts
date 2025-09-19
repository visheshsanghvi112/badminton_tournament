import { AuthService } from './auth';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RegistrationRequest {
  universityId: string;
  teamName: string;
  manager: {
    name: string;
    email: string;
    phone: string;
  };
  players: Array<{
    name: string;
    dob: string;
    course: string;
    idDocs: Array<{
      type: string;
      url: string;
    }>;
    photoUrl: string;
    role?: string;
  }>;
  travel: {
    arrival: string;
    departure: string;
    transport?: string;
    requiresPickup?: boolean;
  };
  accommodation: {
    required: boolean;
    roomType: string;
    sharing?: string;
    deposit?: number;
  };
  fees: {
    total: number;
    breakdown: Array<{
      name: string;
      amount: number;
    }>;
  };
}

class ApiClient {
  private baseURL: string;
  private useMocks: boolean;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || '/api';
    this.useMocks = import.meta.env.VITE_USE_MOCKS !== 'false';
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const auth = AuthService.getStoredAuth();
    if (auth) {
      headers['Authorization'] = `Bearer ${auth.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.useMocks 
        ? endpoint 
        : `${this.baseURL}${endpoint}`;

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Request failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string) {
    return this.request('/auth/reset', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  // Registration endpoints
  async createRegistration(data: RegistrationRequest) {
    return this.request('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRegistrations(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.request(`/registrations${params}`);
  }

  async getRegistration(id: string) {
    return this.request(`/registrations/${id}`);
  }

  async updateRegistrationStatus(id: string, status: string, comment?: string) {
    return this.request(`/registrations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, comment }),
    });
  }

  // Universities
  async getUniversities() {
    return this.request('/universities');
  }

  // File uploads
  async uploadFile(file: File, folder: string = 'documents') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.request('/uploads', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }

  // Fixtures
  async getFixtures() {
    return this.request('/fixtures');
  }

  async createFixture(fixture: any) {
    return this.request('/fixtures', {
      method: 'POST',
      body: JSON.stringify(fixture),
    });
  }

  async updateFixture(id: string, fixture: any) {
    return this.request(`/fixtures/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fixture),
    });
  }

  // Matches
  async getMatch(id: string) {
    return this.request(`/matches/${id}`);
  }

  async updateMatchScore(id: string, score: any) {
    return this.request(`/matches/${id}/score`, {
      method: 'POST',
      body: JSON.stringify(score),
    });
  }

  // Payments
  async createPayment(data: any) {
    return this.request('/payments/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPayments() {
    return this.request('/payments');
  }

  // Sponsors
  async getSponsors() {
    return this.request('/sponsors');
  }

  async createSponsor(sponsor: any) {
    return this.request('/sponsors', {
      method: 'POST',
      body: JSON.stringify(sponsor),
    });
  }

  // Reports
  async getDailyReport(date: string) {
    return this.request(`/reports/daily?date=${date}`);
  }
}

export const apiClient = new ApiClient();