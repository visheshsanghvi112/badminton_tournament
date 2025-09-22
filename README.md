# West Zone Inter-University Women's Badminton Tournament 2025

A comprehensive tournament management platform for the West Zone Inter-University Women's Badminton Tournament hosted by Symbiosis International University.

## 🏆 About This Project

This platform provides a complete solution for managing university badminton tournaments, including:
- **Player Registration & Management**
- **Team Organization & Assignment**
- **Tournament Scheduling & Fixtures**
- **Real-time Match Updates**
- **Payment Processing**
- **Administrative Dashboard**

## 📋 Features

- **Multi-Role Authentication**: Super Admin, Admin, Manager, and Player roles
- **Secure Data Management**: Firebase Firestore with comprehensive security rules
- **Responsive Design**: Mobile-first approach with modern UI components
- **Real-time Updates**: Live tournament data and match results
- **Payment Integration**: Secure payment processing for registrations
- **Analytics Dashboard**: Comprehensive tournament statistics and insights

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Firebase project configured
- Environment variables set up

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Firebase (Auth, Firestore, Storage)
- **State Management**: React Query for server state
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations with custom utilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── dashboards/     # Role-specific dashboards
│   └── guards/         # Route protection components
├── pages/              # Application pages/routes
├── lib/                # Utilities and services
│   ├── firebase.ts     # Firebase configuration
│   ├── auth.ts         # Authentication service
│   └── firestore.ts    # Firestore services
├── hooks/              # Custom React hooks
└── contexts/           # React contexts
```

## 🔐 Security Features

- **Role-Based Access Control (RBAC)** with 4 distinct roles
- **Firebase Security Rules** for data protection
- **Input Validation** and sanitization
- **Secure Authentication** with multiple providers
- **Environment Variable Protection**
- **Security Headers** configured for deployment

## 📄 Legal & Compliance

- **Privacy Policy**: Comprehensive data protection and privacy practices
- **Terms of Service**: User agreements and platform usage terms
- **License**: MIT License for open-source usage
- **Data Protection**: GDPR and privacy regulation compliance

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## 📞 Support & Contact

For technical support or questions:
- **Email**: badminton.tournament@symbiosis.ac.in
- **Phone**: +91 20 2528 1000
- **Address**: Symbiosis International University, Pune, Maharashtra, India

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Symbiosis International University** for hosting the tournament
- **Firebase** for backend infrastructure
- **shadcn/ui** for beautiful UI components
- **React** and **TypeScript** communities for excellent tooling

---

**Built with ❤️ for the West Zone Inter-University Women's Badminton Tournament 2025**

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d55dea2e-7519-4db2-bc7d-f19e10c9a6f6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d55dea2e-7519-4db2-bc7d-f19e10c9a6f6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
