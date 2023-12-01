const consumirAPI = async (graphqlEndpoint, query, variables = {}) => {
    const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });

    return response.json();
}

const GRAPHQL_ENDPOINT = 'http://localhost:4000/';

async function fazerChamadaGraphQLSupplier() {
    const email = document.querySelector('.email').value;
    const cpf = document.querySelector('.cpf').value;
    const phone = document.querySelector('.phone').value;
    const password = document.querySelector('.password').value;

    const CREATE_SUPPLIER = `
        mutation CreateSupplier($supplier: SupplierInput!) {
            createSupplier(supplier: $supplier) {
                email
                phone
                document
            }
        }
    `;

    const supplier = {
        supplier: {
            email: email,
            phone: phone,
            document: cpf,
            password: password
        }
    }

    try {
        const { data, errors } = await consumirAPI(
            GRAPHQL_ENDPOINT,
            CREATE_SUPPLIER,
            supplier
        );

        if (errors && errors.length > 0) {
            console.error('Erro ao cadastrar fornecedor:', errors);
            const errorMessage = errors.map(error => error.message).join('\n');
            alert(`Erro ao cadastrar fornecedor:\n${errorMessage}`);
        } else {
            if (!data) {
                alert('Fornecedor não cadastrado.');
            } else {
                console.log(data);
                alert('Fornecedor cadastrado com sucesso!');
                window.location.href = '../../+/supplier/supplier.html';
            }
        }
    } catch (error) {
        console.error('Erro ao realizar chamada GraphQL:', error);
        alert('Erro ao cadastrar fornecedor. Por favor, tente novamente.');
    }
    
}

async function fazerChamadaGraphQLIndustry() {
    const email = document.querySelector('.email').value;
    const cnpj = document.querySelector('.cnpj').value;
    const phone = document.querySelector('.phone').value;
    const password = document.querySelector('.password').value;

    const CREATE_INDUSTRY = `
        mutation CreateIndustry($industryInput: IndustryInput!) {
            createIndustry(industryInput: $industryInput) {
                email
                phone
                cnpj
            }
        }
    `;

    const industryInput = {
        industryInput: {
            email: email,
            phone: phone,
            cnpj: cnpj,
            password: password
        }
    }

    try {
        const { data, errors } = await consumirAPI(
            GRAPHQL_ENDPOINT,
            CREATE_INDUSTRY,
            industryInput
        );

        if (errors && errors.length > 0) {
            console.error('Erro ao cadastrar indústria:', errors);
            const errorMessage = errors.map(error => error.message).join('\n');
            alert(`Erro ao cadastrar indústria:\n${errorMessage}`);
        } else {
            if (!data) {
                alert('Indústria não cadastrada.');
            } else {
                console.log(data);
                alert('Indústria cadastrada com sucesso!');
                window.location.href = '../../+/industry/search.html';
            }
        }
    } catch (error) {
        console.error('Erro ao realizar chamada GraphQL:', error);
        alert('Erro ao cadastrar indústria. Por favor, tente novamente.');
    }
    
}
