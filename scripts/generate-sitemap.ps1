Add-Type -AssemblyName System.Drawing

$canvas = New-Object System.Drawing.Bitmap 1600, 1100
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(248, 250, 252))

$titleFont = New-Object System.Drawing.Font("Segoe UI", 30, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font("Segoe UI", 13)
$sectionFont = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$nodeFont = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Bold)
$pathFont = New-Object System.Drawing.Font("Consolas", 11)
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(148, 163, 184), 3)
$linePen.CustomEndCap = New-Object System.Drawing.Drawing2D.AdjustableArrowCap(5, 7, $true)

function Draw-RoundedRectangle($graphics, $brush, $pen, [int]$x, [int]$y, [int]$width, [int]$height, [int]$radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $width - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $width - $diameter, $y + $height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $graphics.DrawPath($pen, $path)
  $path.Dispose()
}

function Draw-Node([int]$x, [int]$y, [int]$width, [int]$height, [string]$name, [string]$path, [System.Drawing.Color]$fill, [System.Drawing.Color]$border) {
  $brush = New-Object System.Drawing.SolidBrush($fill)
  $pen = New-Object System.Drawing.Pen($border, 2)
  Draw-RoundedRectangle $graphics $brush $pen $x $y $width $height 16
  $nameBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(15, 23, 42))
  $pathBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(71, 85, 105))
  $graphics.DrawString($name, $nodeFont, $nameBrush, $x + 18, $y + 17)
  $graphics.DrawString($path, $pathFont, $pathBrush, $x + 18, $y + 48)
  $brush.Dispose(); $pen.Dispose(); $nameBrush.Dispose(); $pathBrush.Dispose()
}

$dark = [System.Drawing.Color]::FromArgb(15, 23, 42)
$orange = [System.Drawing.Color]::FromArgb(234, 88, 12)
$publicFill = [System.Drawing.Color]::FromArgb(255, 247, 237)
$publicBorder = [System.Drawing.Color]::FromArgb(251, 146, 60)
$adminFill = [System.Drawing.Color]::FromArgb(239, 246, 255)
$adminBorder = [System.Drawing.Color]::FromArgb(59, 130, 246)
$authFill = [System.Drawing.Color]::FromArgb(240, 253, 244)
$authBorder = [System.Drawing.Color]::FromArgb(34, 197, 94)

$darkBrush = New-Object System.Drawing.SolidBrush($dark)
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(71, 85, 105))
$orangeBrush = New-Object System.Drawing.SolidBrush($orange)
$graphics.DrawString("Sitemap Portal Berita", $titleFont, $darkBrush, 70, 48)
$graphics.DrawString("Struktur navigasi BeritaFomo · Next.js App Router", $subtitleFont, $mutedBrush, 72, 95)

$graphics.DrawString("SITUS PUBLIK", $sectionFont, $orangeBrush, 100, 185)
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(37, 99, 235))
$graphics.DrawString("SISTEM REDAKSI", $sectionFont, $blueBrush, 1040, 185)

Draw-Node 580 145 440 90 "BeritaFomo — Beranda" "/" $publicFill $publicBorder
Draw-Node 100 300 330 90 "Kategori" "/kategori/:slug" $publicFill $publicBorder
Draw-Node 510 300 330 90 "Detail Artikel" "/berita/:slug" $publicFill $publicBorder
Draw-Node 920 300 330 90 "Login Redaksi" "/login" $authFill $authBorder
Draw-Node 1240 300 280 90 "Dashboard CMS" "/admin" $adminFill $adminBorder

Draw-Node 120 490 290 82 "Teknologi" "/kategori/teknologi" $publicFill $publicBorder
Draw-Node 120 600 290 82 'Tren dan Viral' '/kategori/tren-viral' $publicFill $publicBorder
Draw-Node 120 710 290 82 "Finansial" "/kategori/finansial" $publicFill $publicBorder
Draw-Node 120 820 290 82 "Gaya Hidup" "/kategori/gaya-hidup" $publicFill $publicBorder
Draw-Node 120 930 290 82 "Hiburan" "/kategori/hiburan" $publicFill $publicBorder

Draw-Node 920 490 270 82 "Buat Berita" "/admin/berita/baru" $adminFill $adminBorder
Draw-Node 1260 490 270 82 "Edit Berita" "/admin/berita/:id/edit" $adminFill $adminBorder
Draw-Node 1090 630 270 82 "Hapus Berita" "Server Action" $adminFill $adminBorder
Draw-Node 1090 760 270 82 "Keluar" "Hapus sesi cookie" $authFill $authBorder

$graphics.DrawLine($linePen, 800, 235, 265, 300)
$graphics.DrawLine($linePen, 800, 235, 675, 300)
$graphics.DrawLine($linePen, 800, 235, 1085, 300)
$graphics.DrawLine($linePen, 1085, 345, 1240, 345)
$graphics.DrawLine($linePen, 265, 390, 265, 490)
$graphics.DrawLine($linePen, 265, 390, 265, 600)
$graphics.DrawLine($linePen, 265, 390, 265, 710)
$graphics.DrawLine($linePen, 265, 390, 265, 820)
$graphics.DrawLine($linePen, 265, 390, 265, 930)
$graphics.DrawLine($linePen, 1380, 390, 1055, 490)
$graphics.DrawLine($linePen, 1380, 390, 1395, 490)
$graphics.DrawLine($linePen, 1380, 390, 1225, 630)
$graphics.DrawLine($linePen, 1380, 390, 1225, 760)

$legendFont = New-Object System.Drawing.Font("Segoe UI", 11)
$graphics.DrawString("Oranye: halaman publik", $legendFont, $mutedBrush, 70, 1040)
$graphics.DrawString("Hijau: autentikasi", $legendFont, $mutedBrush, 300, 1040)
$graphics.DrawString("Biru: halaman terproteksi admin", $legendFont, $mutedBrush, 500, 1040)

$output = Join-Path -Path $PSScriptRoot -ChildPath '..\public\images\sitemap-portal-berita.jpg'
$canvas.Save($output, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graphics.Dispose(); $canvas.Dispose()
