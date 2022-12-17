const rules = {
    title: {
        required: { value: true, message: 'judul harus diisi.'}, 
        maxLength: { value: 20, message: 'panjang judul maksimal 20 karakter.'}
    },
    description: {
        required: { value: true, message: 'deskripsi harus diisi.'}, 
        maxLength: { value: 500, message: 'panjang deskripsi maksimal 500 karakter.'}
    },
    link: {
        // required: { value: true, message: 'link harus diisi.'}, 
        maxLength: { value: 500, message: 'panjang nama lengkap maksimal 500 karakter.'}
    }
}

export {rules}