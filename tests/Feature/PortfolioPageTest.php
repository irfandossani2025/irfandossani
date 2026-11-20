<?php

namespace Tests\Feature;

use Tests\TestCase;

class PortfolioPageTest extends TestCase
{
    public function test_the_portfolio_homepage_loads(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('Irfan Shiraj Dossani')
            ->assertSee('Ideas shape')
            ->assertSee('IRFAN 2.0');
    }

    public function test_each_selected_project_has_a_case_study_page(): void
    {
        foreach (config('portfolio.projects') as $project) {
            $this->get('/projects/'.$project['slug'])
                ->assertOk()
                ->assertSee($project['name'])
                ->assertSee('Stage');
        }
    }
}
