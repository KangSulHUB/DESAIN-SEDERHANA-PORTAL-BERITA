import { Box, Button, FieldLabel, Frame } from "@/components/wireframes/Wireframe";

export default function LoginWireframe() {
  return (
    <Frame title="Login Redaksi">
      <div className="flex min-h-[600px] items-center justify-center bg-gray-900 p-6">
        <Box className="w-full max-w-md space-y-5 p-8">
          <div>
            <p className="text-sm font-bold text-orange-600">BeritaFomo CMS</p>
            <h2 className="mt-2 text-3xl font-black text-gray-900">Masuk ke redaksi</h2>
            <p className="mt-2 text-sm text-gray-500">Kelola artikel dari satu tempat.</p>
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <Box className="h-11 px-3 py-2 text-sm text-gray-400">email@beritafomo.com</Box>
          </div>
          <div>
            <FieldLabel>Kata sandi</FieldLabel>
            <Box className="h-11 px-3 py-2 text-sm text-gray-400">••••••••</Box>
          </div>
          <div className="flex justify-center">
            <Button variant="primary">Masuk ke dashboard</Button>
          </div>
        </Box>
      </div>
    </Frame>
  );
}