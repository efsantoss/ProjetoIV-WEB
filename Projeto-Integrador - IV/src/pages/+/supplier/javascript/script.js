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

async function fazerChamadaLoginGraphQLSupplier() {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    const LOGIN_SUPPLIER = `
        query LoginSupplier($userInput: UserInput!) {
            userLogIn(userInput: $userInput) {
                message
                status
                id
            }
        }
    `;

    const userInput = {
        userInput: {
            email: email,
            password: password
        }
    };

    try {
        const { data, errors } = await consumirAPI(
            GRAPHQL_ENDPOINT,
            LOGIN_SUPPLIER,
            userInput
        );

        if (errors && errors.length > 0) {
            console.error('Erro ao fazer login:', errors);
            const errorMessage = errors.map(error => error.message).join('\n');
            alert(`Erro ao fazer login:\n${errorMessage}`);
        } else {
            if (!data || !data.userLogIn) {
                alert('Fornecedor não encontrado. Verifique seu e-mail e senha.');
            } else {
                console.log(data);
                alert('Login bem-sucedido!');
                const userId = data.userLogIn.id;
                window.localStorage.setItem('userId', userId);
                window.location.href = '../../+/supplier/supplier.html';
            }
        }
    } catch (error) {
        console.error('Erro ao realizar chamada GraphQL:', error);
        alert('Erro ao fazer login. Por favor, tente novamente.');
    }
}

async function fazerChamadaLoginGraphQLIndustry() {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    const LOGIN_INDUSTRY = `
        query LoginIndustry($userInput: UserInput!) {
            userLogIn(userInput: $userInput) {
                message
                status
                id
            }
        }
    `;

    const userInput = {
        userInput: {
            email: email,
            password: password
        }
    };

    try {
        const { data, errors } = await consumirAPI(
            GRAPHQL_ENDPOINT,
            LOGIN_INDUSTRY,
            userInput
        );

        if (errors && errors.length > 0) {
            console.error('Erro ao fazer login:', errors);
            const errorMessage = errors.map(error => error.message).join('\n');
            alert(`Erro ao fazer login:\n${errorMessage}`);
        } else {
            if (!data || !data.userLogIn) {
                alert('Usuário não encontrado. Verifique seu e-mail e senha.');
            } else {
                console.log(data);
                alert('Login bem-sucedido!');
                window.location.href = '../../+/industry/search.html';
            }
        }
    } catch (error) {
        console.error('Erro ao realizar chamada GraphQL:', error);
        alert('Erro ao fazer login. Por favor, tente novamente.');
    }
}

async function fazerChamadaGraphQLSupply() {
    const userId = window.localStorage.getItem('userId');
    const address = document.querySelector('.address').value;
    const quantityInput = document.querySelector('.quantity').value;
    const quantity = parseInt(quantityInput.replace(/\D/g, ''));

    const CREATE_SUPPLY = `
        mutation UpdateHistory($supplyData: SupplyDataInput!) {
            updateSupplierHistory(supplyData: $supplyData) {
                id
                address
                quantity
            }
        }
    `;

    const supplyData = {
        supplyData: {
            id: userId,
            address: address,
            quantity: quantity
        }
    }

    try {
        const { data, errors } = await consumirAPI(
            GRAPHQL_ENDPOINT,
            CREATE_SUPPLY,
            supplyData
        );

        if (errors && errors.length > 0) {
            console.error('Erro ao cadastrar os itens:', errors);
            const errorMessage = errors.map(error => error.message).join('\n');
            alert(`Erro ao cadastrar os itens:\n${errorMessage}`);
        } else {
            if (!data) {
                alert('Itens não cadastrados.');
            } else {
                console.log(data);
                alert('Itens cadastrados com sucesso!');
            }
        }
    } catch (error) {
        console.error('Erro ao realizar chamada GraphQL:', error);
        alert('Erro ao cadastrar os itens. Por favor, tente novamente.');
    }
}

async function getSuppliesData() {
    const GET_SUPPLIES = `
        query GetSupplies {
            getSupplies {
                id
                history {
                    id
                    address
                    quantity
                }
            }
        }
    `;

    try {
        const { data, errors } = await consumirAPI(GRAPHQL_ENDPOINT, GET_SUPPLIES);

        if (errors && errors.length > 0) {
            console.error('Erro ao buscar fornecimentos:', errors);
            const errorMessage = errors.map(error => error.message).join('\n');
            alert(`Erro ao buscar fornecimentos:\n${errorMessage}`);
        } else {
            if (!data || !data.getSupplies) {
                alert('Fornecimentos não encontrados.');
            } else {
                console.log(data.getSupplies);
                // Aqui você pode usar os dados para atualizar o seu frontend
            }
        }
    } catch (error) {
        console.error('Erro ao realizar chamada GraphQL:', error);
        alert('Erro ao buscar fornecimentos. Por favor, tente novamente.');
    }
}

// Chame a função para buscar os dados dos fornecimentos
getSuppliesData();
