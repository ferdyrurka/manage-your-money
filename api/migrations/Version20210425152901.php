<?php

declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

class Version20210425152901 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE operation ADD hash VARCHAR(36) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1981A66DD1B862B8 ON operation (hash)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX UNIQ_1981A66DD1B862B8 ON operation');
        $this->addSql('ALTER TABLE operation DROP hash');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
