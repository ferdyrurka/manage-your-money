<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210313162144 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E33A664CD1B862B8 ON operation_category (hash)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BBE8F646D1B862B8 ON operation_location (hash)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A3AE0AB8D1B862B8 ON operation_type (hash)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_E33A664CD1B862B8 ON operation_category');
        $this->addSql('DROP INDEX UNIQ_BBE8F646D1B862B8 ON operation_location');
        $this->addSql('DROP INDEX UNIQ_A3AE0AB8D1B862B8 ON operation_type');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
