<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210418092844 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation_category ADD created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE operation_location ADD created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE operation_type ADD created_at DATETIME NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE operation_category DROP created_at');
        $this->addSql('ALTER TABLE operation_location DROP created_at');
        $this->addSql('ALTER TABLE operation_type DROP created_at');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
