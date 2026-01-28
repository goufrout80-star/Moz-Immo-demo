'use client'

import { useState } from 'react'
import { User, Bell, Shield, Globe, Moon, Sun, Check } from 'lucide-react'
import { Card, CardContent, Button, Input, Textarea } from '@/components/ui'
import { useStore } from '@/lib/store'
import { getCurrentUser } from '@/lib/auth'

export default function SettingsPage() {
  const user = getCurrentUser()
  const { theme, setTheme, locale, setLocale } = useStore()
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {[
                { icon: User, label: 'Profile', id: 'profile' },
                { icon: Bell, label: 'Notifications', id: 'notifications' },
                { icon: Shield, label: 'Security', id: 'security' },
                { icon: Globe, label: 'Preferences', id: 'preferences' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Section */}
          <Card id="profile">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <Input
                  label="Phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
                <Textarea
                  label="Bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
                <Button onClick={handleSave}>
                  {saved ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card id="notifications">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', desc: 'Receive booking confirmations and updates' },
                  { label: 'SMS notifications', desc: 'Get text messages for important updates' },
                  { label: 'Marketing emails', desc: 'Receive special offers and promotions' },
                  { label: 'Push notifications', desc: 'Browser notifications for real-time updates' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-luxury-gold"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card id="security">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </h2>
              <div className="space-y-4">
                <div>
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card id="preferences">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Preferences
              </h2>
              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <p className="font-medium mb-3">Theme</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'light'
                          ? 'border-luxury-gold bg-brand-50 dark:bg-brand-900'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'border-luxury-gold bg-brand-50 dark:bg-brand-900'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <p className="font-medium mb-3">Language</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setLocale('en')}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        locale === 'en'
                          ? 'border-luxury-gold bg-brand-50 dark:bg-brand-900'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLocale('fr')}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        locale === 'fr'
                          ? 'border-luxury-gold bg-brand-50 dark:bg-brand-900'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      Français
                    </button>
                  </div>
                </div>

                {/* Currency */}
                <div>
                  <p className="font-medium mb-3">Currency</p>
                  <div className="flex gap-3">
                    {['EUR', 'USD', 'MAD'].map((currency) => (
                      <button
                        key={currency}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-luxury-gold transition-colors"
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
