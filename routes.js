// routes.js
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= ADMIN ROUTES =====================
routes.add('admin_home', '/admin', 'admin/Data');
// DATA
routes.add('admin_data', '/admin/data/:tab?', 'admin/Data');
routes.add('admin_data_detail', '/admin/data/:tab/:id/:subtab?', 'admin/DataDetail');
// DASHBOARDS
routes.add('admin_dashboards', '/admin/dashboards/:tab?', 'admin/Dashboards');
routes.add('admin_dashboards_detail', '/admin/dashboards/:tab/:id/:subtab?', 'admin/DashboardsDetail');
// PARTNERS
routes.add('admin_partners', '/admin/partners/:tab?', 'admin/Partners');
routes.add('admin_partners_detail', '/admin/partners/:tab/:id/:subtab?', 'admin/PartnersDetail');
// PAGES
routes.add('admin_pages', '/admin/pages/:tab?', 'admin/Pages');
routes.add('admin_pages_detail', '/admin/pages/:tab/:id/:subtab?', 'admin/PagesDetail');
// TOOLS
routes.add('admin_tools', '/admin/tools/:tab?', 'admin/Tools');
routes.add('admin_tools_detail', '/admin/tools/:tab/:id/:subtab?', 'admin/ToolsDetail');
// INDICATORS
routes.add('admin_indicators', '/admin/indicators/:tab?', 'admin/Indicators');
routes.add('admin_indicators_detail', '/admin/indicators/:tab/:id/:subtab?', 'admin/IndicatorsDetail');
// INDICATORS
routes.add('admin_resources', '/admin/resources/:tab?', 'admin/Resources');
routes.add('admin_resources_detail', '/admin/resources/:tab/:id/:subtab?', 'admin/ResourcesDetail');
// MY PREP
routes.add('admin_myprep', '/myprep/:tab?/:subtab?', 'admin/MyPREP');
routes.add('admin_myprep_detail', '/myprep-detail/:tab?/:id?/:subtab?', 'admin/MyPREPDetail');
// INSIGHTS
routes.add('admin_insights', '/admin/insights/:tab?', 'admin/Insights');
routes.add('admin_insights_detail', '/admin/insights/:tab/:id/:subtab?', 'admin/InsightsDetail');

// ------ DASHBOARDS ------------
routes.add('dashboards_detail', '/dashboards/:slug', 'app/DashboardsDetail');
// routes.add('dashboards', '/dashboards', 'app/Dashboards');

// ------ WIDGETS ------------
routes.add('widget_detail', '/widget/:id', 'app/widget-detail');

// ------ EMBED -------------
routes.add('embed_widget', '/embed/widget/:id', 'app/embed/EmbedWidget');
routes.add('embed_embed', '/embed/embed/:id', 'app/embed/EmbedEmbed');
routes.add('embed_text', '/embed/text/:id', 'app/embed/EmbedText');
routes.add('embed_map', '/embed/map/:id', 'app/embed/EmbedMap');
routes.add('embed_dataset', '/embed/dataset/:id', 'app/embed/EmbedDataset');
routes.add('embed_table', '/embed/table', 'app/embed/EmbedTable');
routes.add('embed_dashboard', '/embed/dashboard/:slug', 'app/embed/EmbedDashboard');

// ------ PDF EXPORT -------------
routes.add('export_ember', '/export/embed/:id', 'app/export/ExportEmbed');


module.exports = routes;
