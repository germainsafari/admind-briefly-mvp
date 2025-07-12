"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Users, FileText, Building } from "lucide-react"

export default function OnboardingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user

  useEffect(() => {
    if (!session?.user) {
      router.push("/")
    }
  }, [session, router])

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const getRoleSpecificContent = () => {
    switch ((user as any).role) {
      case 'admin':
        return {
          title: "Welcome to Admind Briefly",
          description: "Set up your organization and start managing your team",
          steps: [
            {
              icon: Building,
              title: "Create Organization",
              description: "Set up your organization structure and branding"
            },
            {
              icon: Users,
              title: "Invite Managers",
              description: "Add managers to help you organize and review briefs"
            },
            {
              icon: FileText,
              title: "Review Briefs",
              description: "Monitor and manage all brief submissions"
            }
          ]
        }
      case 'manager':
        return {
          title: "Welcome to Your Manager Dashboard",
          description: "Start managing clients and briefs for your organization",
          steps: [
            {
              icon: Users,
              title: "Add Clients",
              description: "Invite clients to create briefs for your organization"
            },
            {
              icon: FileText,
              title: "Review Briefs",
              description: "Review and organize client brief submissions"
            },
            {
              icon: CheckCircle,
              title: "Collaborate",
              description: "Work with your team to deliver great results"
            }
          ]
        }
      case 'client':
        return {
          title: "Welcome to Brief Creation",
          description: "Start creating and managing your project briefs",
          steps: [
            {
              icon: FileText,
              title: "Create Your First Brief",
              description: "Fill out a comprehensive brief for your project"
            },
            {
              icon: Users,
              title: "Share with Team",
              description: "Share your brief with stakeholders and team members"
            },
            {
              icon: CheckCircle,
              title: "Track Progress",
              description: "Monitor the status and progress of your briefs"
            }
          ]
        }
      default:
        return {
          title: "Welcome to Admind Briefly",
          description: "Get started with your account setup",
          steps: [
            {
              icon: CheckCircle,
              title: "Complete Profile",
              description: "Set up your profile and preferences"
            },
            {
              icon: FileText,
              title: "Explore Features",
              description: "Learn about the available tools and features"
            },
            {
              icon: ArrowRight,
              title: "Get Started",
              description: "Begin using the platform for your projects"
            }
          ]
        }
    }
  }

  const content = getRoleSpecificContent()

  const handleGetStarted = () => {
    const role = (user as any).role
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'manager') {
      router.push('/manager')
    } else if (role === 'client') {
      router.push('/client')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{content.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {content.steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p>Need help? Contact your administrator or check our documentation.</p>
        </div>
      </div>
    </div>
  )
} 