INSERT INTO public.sys_parameter
(id, created_at, status, deleted, "name", string_value, number_value, date_value, bool_value, config, description)
VALUES(1, '2024-08-21 04:31:18.581', 'A', false, 'ONBOARD_STEPS', NULL, NULL, NULL, NULL, 
'
[
  {
    "link": "/minhaconta/profile",
    "title": "Completar perfil",
    "completed": false,
    "completedAt": null,
    "description": "Complete seu perfil",
    "id": "complete_your_profile"
  },
  {
    "link": "/minhaconta/stores/minha-loja",
    "title": "Crie sua primeira loja",
    "completed": false,
    "completedAt": null,
    "description": "Configure sua loja para desbloquear novas funcionalidades!",
    "id": "create_store"
  },
  {
    "link": "/minhaconta/stores/minha-loja",
    "title": "Comece a gerencia sua loja",
    "completed": false,
    "completedAt": null,
    "description": "Depois de criar uma loja, começe a gerencia-la através do menu MEU NEGÓCIO.",
    "id": "my_store"
  },
  {
    "link": "/minhaconta/cardapio?start=true",
    "title": "Crie sua primeira categoria!",
    "completed": false,
    "completedAt": null,
    "description": "Adicione uma nova categoria, essa é uma forma de ajudarmos a organizar melhor os itens da sua loja.",
    "id": "start_catalog"
  },
  {
    "link": "/minhaconta/cardapio?start=true",
    "title": "Configure o seu primeiro item/produto!",
    "completed": false,
    "completedAt": null,
    "description": "Preparamos uma forma especial para cadastrar e organizar seus itens/produtos. Divirta-se!",
    "id": "start_catalog_new_item"
  },
  {
    "link": "/minhaconta/stores/business-hour",
    "title": "Configure o horário de atendimento da sua loja!",
    "completed": false,
    "completedAt": null,
    "description": "Essa informação é importante para que seus clientes saibam qual o melhor horário para fazer seus pedidos!",
    "id": "configure_bussines_hour"
  }
]'::jsonb, NULL);

