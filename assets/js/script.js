// Konfigurasi Supabase
const SUPABASE_URL = 'https://oisrtlcxdwgvzrxrlzpb.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pc3J0bGN4ZHdndnpyeHJsenBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzM3OTEsImV4cCI6MjA3ODYwOTc5MX0.aI162olkIydnJrRxLnC0NsBU9umySmd2nWSTt8Hc1ec'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fungsi 1: Mencatat Pengunjung
async function catatKunjungan() {
    const judulHalaman = document.title;
    
    // Insert data ke tabel 'pengunjung'
    const { error } = await _supabase
        .from('pengunjung')
        .insert([{ halaman: judulHalaman }]);

    if (error) {
        console.error('Gagal mencatat kunjungan:', error.message);
    }
}

// Fungsi 2: Menampilkan Total Pengunjung di Footer
async function tampilkanTotalKunjungan() {
    // Menghitung total baris di tabel pengunjung
    const { count, error } = await _supabase
        .from('pengunjung')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Gagal mengambil total kunjungan:', error.message);
        return;
    }

    // Cari elemen dengan ID 'total-views' di HTML dan masukkan angkanya
    const counterElement = document.getElementById('total-views');
    if (counterElement && count !== null) {
        counterElement.innerText = count;
    }
}

// Eksekusi fungsi saat DOM sudah selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    catatKunjungan();
    tampilkanTotalKunjungan();
});