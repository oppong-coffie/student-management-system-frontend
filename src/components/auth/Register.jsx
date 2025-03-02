import React from 'react'

const Register = () => {
  return (
  <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left side with logo */}
      <div className="relative hidden items-center justify-center bg-[#1C2D6B] bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-23%20223924-yGpO5QThliUeikrzR4dpwbqyakDFEc.png')] bg-cover bg-center bg-no-repeat md:flex">
        <div className="absolute inset-0 bg-[#1C2D6B]/90" />
        <Image
          src="/placeholder.svg?height=300&width=300"
          alt="University Logo"
          width={300}
          height={300}
          className="relative z-10"
          priority
        />
      </div>

      {/* Right side with login form */}
      <div className="flex items-center justify-center px-6 py-12 md:px-10">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome !</h1>
            <p className="text-gray-500">Dial *772*45# to pay your fees.</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="indexNo" className="text-sm font-medium">
                Index No
              </label>
              <Input
                id="indexNo"
                type="email"
                value={formData.indexNo}
                onChange={(e) => setFormData({ ...formData, indexNo: e.target.value })}
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-50"
              />
            </div>

            <Button className="w-full bg-[#1C2D6B] hover:bg-[#1C2D6B]/90">Sign in</Button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="text-center text-sm text-gray-500">©2025 Takoradi Technical University</div>
        </div>
      </div>
    </div>
      
  )
}

export default Register
