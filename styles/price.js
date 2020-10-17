document.querySelectorAll('.price').forEach(node =>{
    node.textContent = new Intl.NumberFormat('ru-RU',{
        currency:'rub',
        style:'currency'
    }).format(node.textContent)
})

const $pay = document.querySelector('#pay')
if ($pay){
    $pay.addEventListener('click',event=>{
        if (event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
            fetch('/pay/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(pay =>{
                    if(pay.products.length){
                        const html = pay.products.map(prod=>{
                            return `<tr>
                                        <td>${prod.title}</td>
                                        <td>${prod.price}</td>
                                        <td>${prod.count}</td>
                                        <td>
                                            <button class="btn btn-small js-remove"
                                                    data-id="${prod.id}">Удалить</button>
                                        </td>
                                    </tr>`
                        }).join('')
                        $pay.querySelector('tbody').innerHTML = html
                        $pay.querySelector('.price').textContent = pay.price
                    }else{
                        $pay.innerHTML = '<p>Корзина пуста</p>'
                    }
                })
        }
    })
}
