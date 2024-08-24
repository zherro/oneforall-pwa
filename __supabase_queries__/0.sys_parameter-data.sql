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
    "title": "Envie seu catálogo, Ou faça do seu jeito!",
    "completed": false,
    "completedAt": null,
    "description": "Se enviar seu catálogo/cardápio bem, rapidinho cadastramos seus itens e serviços para você. Ou pode fazer do seu jeito, é bem facil.",
    "id": "start_catalog"
  }
]'::jsonb, NULL);

